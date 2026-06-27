import os
import sys

# Add backend directory to sys.path so we can import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal, engine, Base
from app.db.models import User, Profile, Project, Skill
from app.core.security import get_password_hash

def populate_demo_data():
    # Ensure tables are created
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if demo user already exists
    demo_user = db.query(User).filter(User.email == "demo@portfoliohub.com").first()
    if demo_user:
        print("Demo user already exists.")
        db.close()
        return

    # Create User
    user = User(
        username="demo",
        email="demo@portfoliohub.com",
        full_name="Demo User",
        hashed_password=get_password_hash("Demo@123"),
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create Profile
    profile = Profile(
        user_id=user.id,
        headline="Senior Full Stack Engineer",
        bio="I am a passionate software engineer with a focus on building scalable web applications. I love open source and mentoring junior developers.",
        location="San Francisco, CA",
        website="https://portfoliohub.com",
        github_url="https://github.com/demo",
        linkedin_url="https://linkedin.com/in/demo",
        twitter_url="https://twitter.com/demo"
    )
    db.add(profile)

    # Create Skills
    skills = [
        Skill(user_id=user.id, name="React", category="Frontend", proficiency=90),
        Skill(user_id=user.id, name="TypeScript", category="Frontend", proficiency=85),
        Skill(user_id=user.id, name="Python", category="Backend", proficiency=95),
        Skill(user_id=user.id, name="FastAPI", category="Backend", proficiency=90),
        Skill(user_id=user.id, name="PostgreSQL", category="Database", proficiency=80),
        Skill(user_id=user.id, name="Docker", category="DevOps", proficiency=75),
    ]
    db.add_all(skills)

    # Create Projects
    projects = [
        Project(
            user_id=user.id,
            title="E-Commerce Platform",
            description="A highly scalable e-commerce backend handling 10k TPS.",
            url="https://github.com/demo/ecommerce",
            image_url="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
        ),
        Project(
            user_id=user.id,
            title="Realtime Chat App",
            description="WebSocket based chat application using React and FastAPI.",
            url="https://github.com/demo/chat",
            image_url="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
        )
    ]
    db.add_all(projects)

    db.commit()
    db.close()
    print("Demo data populated successfully.")

if __name__ == "__main__":
    populate_demo_data()
