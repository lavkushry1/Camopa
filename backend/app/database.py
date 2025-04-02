from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import enum
from datetime import datetime

# Create SQLAlchemy engine
SQLALCHEMY_DATABASE_URL = "sqlite:///./campa_dealership.db"
# For PostgreSQL, uncomment the following line:
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/campa_dealership"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Define application status enum
class ApplicationStatus(str, enum.Enum):
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    ADDITIONAL_INFO_REQUIRED = "additional_info_required"
    APPROVED = "approved"
    REJECTED = "rejected"

# Define payment status enum
class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    applications = relationship("Application", back_populates="user")

# Application model
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    tracking_id = Column(String, unique=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Personal Information
    full_name = Column(String)
    email = Column(String)
    phone = Column(String)
    
    # Business Information
    business_name = Column(String)
    business_type = Column(String)
    registration_number = Column(String)
    
    # Address
    street_address = Column(String)
    city = Column(String)
    state = Column(String)
    postal_code = Column(String)
    
    # Additional Information
    area_of_operation = Column(String)
    expected_monthly_sales = Column(Float)
    previous_experience = Column(Text)
    references = Column(Text)
    
    # Application Status
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.SUBMITTED)
    admin_notes = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="applications")
    payments = relationship("Payment", back_populates="application")
    approval_letter = relationship("ApprovalLetter", back_populates="application", uselist=False)
    status_updates = relationship("ApplicationStatusUpdate", back_populates="application")

# Payment model
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"))
    amount = Column(Float)
    transaction_id = Column(String, unique=True, index=True)
    payment_method = Column(String)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    upi_reference = Column(String)
    payment_date = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    application = relationship("Application", back_populates="payments")

# Approval Letter model
class ApprovalLetter(Base):
    __tablename__ = "approval_letters"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), unique=True)
    dealership_id = Column(String, unique=True, index=True)
    file_path = Column(String)
    issued_date = Column(DateTime, default=datetime.utcnow)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    application = relationship("Application", back_populates="approval_letter")

# Application Status Update model (for tracking history)
class ApplicationStatusUpdate(Base):
    __tablename__ = "application_status_updates"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"))
    previous_status = Column(Enum(ApplicationStatus))
    new_status = Column(Enum(ApplicationStatus))
    notes = Column(Text)
    updated_by = Column(Integer, ForeignKey("users.id"))
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    application = relationship("Application", back_populates="status_updates")

# Support Request model
class SupportRequest(Base):
    __tablename__ = "support_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    subject = Column(String)
    message = Column(Text)
    is_resolved = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Create all tables in the database
def create_tables():
    Base.metadata.create_all(bind=engine)
