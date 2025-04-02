from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud
from app.database import SessionLocal

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/approval-letters",
    tags=["approval-letters"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.ApprovalLetterResponse)
def create_approval_letter(letter: schemas.ApprovalLetterCreate, db: Session = Depends(get_db)):
    # Verify application exists
    db_application = crud.get_application(db, application_id=letter.application_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Check if application is approved
    if db_application.status != "approved":
        raise HTTPException(
            status_code=400, 
            detail="Cannot create approval letter for non-approved application"
        )
    
    # Check if approval letter already exists
    existing_letter = crud.get_approval_letter(db, application_id=letter.application_id)
    if existing_letter:
        raise HTTPException(
            status_code=400,
            detail="Approval letter already exists for this application"
        )
    
    return crud.create_approval_letter(db=db, letter=letter)

@router.get("/{application_id}", response_model=schemas.ApprovalLetterResponse)
def read_approval_letter(application_id: int, db: Session = Depends(get_db)):
    db_letter = crud.get_approval_letter(db, application_id=application_id)
    if db_letter is None:
        raise HTTPException(status_code=404, detail="Approval letter not found")
    return db_letter
