-- PortfolioHub Supabase Complete Schema
-- Compatible with PostgreSQL & Supabase
-- Includes RLS policies, foreign keys, indexes, and timestamps

-- Enable uuid-ossp extension for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Users Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_image TEXT,
    headline TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    role TEXT DEFAULT 'user'
);

COMMENT ON TABLE public.users IS 'Core user accounts and authentication data.';

-- ==========================================
-- 2. Profiles Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    cover_image TEXT,
    location TEXT,
    phone TEXT,
    website TEXT,
    availability TEXT DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.profiles IS 'Extended user profile information.';

-- ==========================================
-- 3. Projects Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    url TEXT,
    github_url TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
COMMENT ON TABLE public.projects IS 'User portfolio projects.';

-- ==========================================
-- 4. Skills Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_skills_user_id ON public.skills(user_id);
COMMENT ON TABLE public.skills IS 'User technical and soft skills.';

-- ==========================================
-- 5. Certificates Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    expiration_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
COMMENT ON TABLE public.certificates IS 'User certifications and licenses.';

-- ==========================================
-- 6. Education Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT,
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_education_user_id ON public.education(user_id);
COMMENT ON TABLE public.education IS 'User educational background.';

-- ==========================================
-- 7. Experience Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_experience_user_id ON public.experience(user_id);
COMMENT ON TABLE public.experience IS 'User professional experience.';

-- ==========================================
-- 8. Achievements Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    date_achieved DATE,
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON public.achievements(user_id);
COMMENT ON TABLE public.achievements IS 'User awards and achievements.';

-- ==========================================
-- 9. Social Links Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    username TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_social_links_user_id ON public.social_links(user_id);
COMMENT ON TABLE public.social_links IS 'User social media and professional links.';

-- ==========================================
-- 10. Themes Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    primary_color TEXT DEFAULT '#3B82F6',
    secondary_color TEXT DEFAULT '#8B5CF6',
    background_color TEXT DEFAULT '#000000',
    text_color TEXT DEFAULT '#FFFFFF',
    font_family TEXT DEFAULT 'Inter',
    layout_style TEXT DEFAULT 'modern',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.themes IS 'Portfolio theme preferences per user.';

-- ==========================================
-- 11. Settings Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    custom_domain TEXT UNIQUE,
    is_public BOOLEAN DEFAULT TRUE,
    seo_title TEXT,
    seo_description TEXT,
    google_analytics_id TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.settings IS 'Global user settings and SEO configuration.';

-- ==========================================
-- 12. Analytics Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    visitor_id TEXT,
    page_path TEXT NOT NULL,
    referrer TEXT,
    country TEXT,
    device_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics(created_at);
COMMENT ON TABLE public.analytics IS 'Portfolio visitor analytics data.';

-- ==========================================
-- 13. Notifications Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
COMMENT ON TABLE public.notifications IS 'In-app notifications for users.';

-- ==========================================
-- 14. Messages Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
COMMENT ON TABLE public.messages IS 'Contact form messages submitted to the user.';

-- ==========================================
-- 15. Resume Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.resume (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.resume IS 'User resume documents and configurations.';

-- ==========================================
-- 16. Storage References Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.storage_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    bucket_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    content_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_storage_refs_user_id ON public.storage_references(user_id);
COMMENT ON TABLE public.storage_references IS 'References to files stored in Supabase Storage.';


-- ==========================================
-- TRIGGERS: Auto-create Profile, Theme, Settings for New Users
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user_defaults() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id) VALUES (new.id);
  INSERT INTO public.themes (user_id) VALUES (new.id);
  INSERT INTO public.settings (user_id) VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_created_defaults ON public.users;
CREATE TRIGGER on_user_created_defaults
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_defaults();


-- ==========================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_references ENABLE ROW LEVEL SECURITY;


-- ==========================================
-- RLS POLICIES
-- Note: Adjust policies based on whether you are using Supabase Auth natively 
-- or passing a JWT from your FastAPI backend. 
-- Assuming Supabase native Auth (`auth.uid()`) is used for frontend direct access.
-- If the backend uses the Service Role key, it bypasses RLS automatically.
-- ==========================================

-- Users
CREATE POLICY "Users can view all public profiles" ON public.users FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Users can update own record" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Profiles
CREATE POLICY "Profiles are publicly viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Projects
CREATE POLICY "Published projects are viewable by everyone" ON public.projects FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Skills, Certificates, Education, Experience, Achievements, Social Links
CREATE POLICY "Public items are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Users can manage own skills" ON public.skills FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public items are viewable by everyone" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Users can manage own certificates" ON public.certificates FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public items are viewable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Users can manage own education" ON public.education FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public items are viewable by everyone" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Users can manage own experience" ON public.experience FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public items are viewable by everyone" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Users can manage own achievements" ON public.achievements FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public items are viewable by everyone" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Users can manage own social links" ON public.social_links FOR ALL USING (auth.uid() = user_id);

-- Themes & Settings
CREATE POLICY "Themes are viewable by everyone" ON public.themes FOR SELECT USING (true);
CREATE POLICY "Users can update own theme" ON public.themes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Settings are viewable by everyone if public" ON public.settings FOR SELECT USING (is_public = TRUE OR auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON public.settings FOR ALL USING (auth.uid() = user_id);

-- Analytics & Notifications (Private)
CREATE POLICY "Users can manage own analytics" ON public.analytics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Messages (Public can insert, owner can read/manage)
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own messages" ON public.messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE USING (auth.uid() = user_id);

-- Resume
CREATE POLICY "Resumes are viewable by everyone if public" ON public.resume FOR SELECT USING (is_public = TRUE OR auth.uid() = user_id);
CREATE POLICY "Users can manage own resume" ON public.resume FOR ALL USING (auth.uid() = user_id);

-- Storage References
CREATE POLICY "Users can view own storage references" ON public.storage_references FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own storage references" ON public.storage_references FOR ALL USING (auth.uid() = user_id);
