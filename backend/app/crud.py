from sqlalchemy.orm import Session
from app import schemas
from app.database import User, Application, Payment, ApprovalLetter, ApplicationStatusUpdate, SupportRequest, ApplicationStatus
from datetime import datetime
import uuid
from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User CRUD operations
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Application CRUD operations
def get_application(db: Session, application_id: int):
    return db.query(Application).filter(Application.id == application_id).first()

def get_application_by_tracking_id(db: Session, tracking_id: str):
    return db.query(Application).filter(Application.tracking_id == tracking_id).first()

def get_applications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Application).offset(skip).limit(limit).all()

def create_application(db: Session, application: schemas.ApplicationCreate, user_id: int):
    # Generate a unique tracking ID
    tracking_id = str(uuid.uuid4())[:8].upper()
    
    db_application = Application(
        tracking_id=tracking_id,
        user_id=user_id,
        **application.dict()
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def update_application_status(db: Session, application_id: int, status: ApplicationStatus, admin_id: int, notes: str = None):
    db_application = get_application(db, application_id)
    if db_application:
        # Create status update record
        status_update = ApplicationStatusUpdate(
            application_id=application_id,
            previous_status=db_application.status,
            new_status=status,
            notes=notes,
            updated_by=admin_id
        )
        db.add(status_update)
        
        # Update application status
        db_application.status = status
        if notes:
            db_application.admin_notes = notes
        
        db.commit()
        db.refresh(db_application)
        return db_application
    return None

# Payment CRUD operations
def get_payment(db: Session, payment_id: int):
    return db.query(Payment).filter(Payment.id == payment_id).first()

def get_payments_by_application(db: Session, application_id: int):
    return db.query(Payment).filter(Payment.application_id == application_id).all()

def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def update_payment(db: Session, payment_id: int, payment_update: schemas.PaymentUpdate):
    db_payment = get_payment(db, payment_id)
    if db_payment:
        update_data = payment_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_payment, key, value)
        
        db.commit()
        db.refresh(db_payment)
        return db_payment
    return None

# Approval Letter CRUD operations
def get_approval_letter(db: Session, application_id: int):
    return db.query(ApprovalLetter).filter(ApprovalLetter.application_id == application_id).first()

def create_approval_letter(db: Session, letter: schemas.ApprovalLetterCreate):
    db_letter = ApprovalLetter(**letter.dict())
    db.add(db_letter)
    db.commit()
    db.refresh(db_letter)
    return db_letter

# Support Request CRUD operations
def get_support_request(db: Session, request_id: int):
    return db.query(SupportRequest).filter(SupportRequest.id == request_id).first()

def get_support_requests(db: Session, skip: int = 0, limit: int = 100):
    return db.query(SupportRequest).offset(skip).limit(limit).all()

def create_support_request(db: Session, request: schemas.SupportRequestCreate):
    db_request = SupportRequest(**request.dict())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def update_support_request(db: Session, request_id: int, is_resolved: bool):
    db_request = get_support_request(db, request_id)
    if db_request:
        db_request.is_resolved = is_resolved
        db_request.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_request)
        return db_request
    return None
