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
    prefix="/payments",
    tags=["payments"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.PaymentResponse)
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    # Verify application exists
    db_application = crud.get_application(db, application_id=payment.application_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return crud.create_payment(db=db, payment=payment)

@router.get("/{payment_id}", response_model=schemas.PaymentResponse)
def read_payment(payment_id: int, db: Session = Depends(get_db)):
    db_payment = crud.get_payment(db, payment_id=payment_id)
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return db_payment

@router.get("/application/{application_id}", response_model=List[schemas.PaymentResponse])
def read_payments_by_application(application_id: int, db: Session = Depends(get_db)):
    # Verify application exists
    db_application = crud.get_application(db, application_id=application_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    payments = crud.get_payments_by_application(db, application_id=application_id)
    return payments

@router.patch("/{payment_id}", response_model=schemas.PaymentResponse)
def update_payment(
    payment_id: int, 
    payment_update: schemas.PaymentUpdate, 
    db: Session = Depends(get_db)
):
    db_payment = crud.update_payment(db=db, payment_id=payment_id, payment_update=payment_update)
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return db_payment
