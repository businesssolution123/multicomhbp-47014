-- Create users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create answers table
CREATE TABLE public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  answer_value INTEGER NOT NULL CHECK (answer_value >= 1 AND answer_value <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users (public read for now, as we're not using auth)
CREATE POLICY "Anyone can read users" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert users" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update users" ON public.users
  FOR UPDATE USING (true);

-- RLS Policies for answers
CREATE POLICY "Anyone can read answers" ON public.answers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert answers" ON public.answers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update answers" ON public.answers
  FOR UPDATE USING (true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_answers_updated_at
  BEFORE UPDATE ON public.answers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();