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
    prefix="/support",
    tags=["support"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.SupportRequestResponse)
def create_support_request(request: schemas.SupportRequestCreate, db: Session = Depends(get_db)):
    return crud.create_support_request(db=db, request=request)

@router.get("/", response_model=List[schemas.SupportRequestResponse])
def read_support_requests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    requests = crud.get_support_requests(db, skip=skip, limit=limit)
    return requests

@router.get("/{request_id}", response_model=schemas.SupportRequestResponse)
def read_support_request(request_id: int, db: Session = Depends(get_db)):
    db_request = crud.get_support_request(db, request_id=request_id)
    if db_request is None:
        raise HTTPException(status_code=404, detail="Support request not found")
    return db_request

@router.patch("/{request_id}", response_model=schemas.SupportRequestResponse)
def update_support_request(
    request_id: int, 
    request_update: schemas.SupportRequestUpdate, 
    db: Session = Depends(get_db)
):
    db_request = crud.update_support_request(
        db=db, 
        request_id=request_id, 
        is_resolved=request_update.is_resolved
    )
    if db_request is None:
        raise HTTPException(status_code=404, detail="Support request not found")
    return db_request
