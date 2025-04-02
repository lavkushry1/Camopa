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
    prefix="/applications",
    tags=["applications"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.ApplicationResponse)
def create_application(application: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    # For now, we'll use a dummy user_id until authentication is implemented
    user_id = 1
    return crud.create_application(db=db, application=application, user_id=user_id)

@router.get("/", response_model=List[schemas.ApplicationResponse])
def read_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    applications = crud.get_applications(db, skip=skip, limit=limit)
    return applications

@router.get("/{application_id}", response_model=schemas.ApplicationDetailResponse)
def read_application(application_id: int, db: Session = Depends(get_db)):
    db_application = crud.get_application(db, application_id=application_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return db_application

@router.get("/tracking/{tracking_id}", response_model=schemas.ApplicationDetailResponse)
def read_application_by_tracking(tracking_id: str, db: Session = Depends(get_db)):
    db_application = crud.get_application_by_tracking_id(db, tracking_id=tracking_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return db_application

@router.patch("/{application_id}", response_model=schemas.ApplicationResponse)
def update_application(
    application_id: int, 
    application_update: schemas.ApplicationUpdate, 
    db: Session = Depends(get_db)
):
    # For now, we'll use a dummy admin_id until authentication is implemented
    admin_id = 1
    db_application = crud.update_application_status(
        db=db, 
        application_id=application_id, 
        status=application_update.status, 
        admin_id=admin_id,
        notes=application_update.admin_notes
    )
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return db_application
