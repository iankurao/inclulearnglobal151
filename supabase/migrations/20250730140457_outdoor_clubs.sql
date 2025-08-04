-- Create outdoor_clubs table
CREATE TABLE IF NOT EXISTS outdoor_clubs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sports', 'adventure', 'nature', 'recreation', 'therapy')),
  location TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  website TEXT,
  coordinator_name TEXT,
  age_groups TEXT[] DEFAULT '{}',
  activities TEXT[] DEFAULT '{}',
  accessibility_features TEXT[] DEFAULT '{}',
  equipment_provided TEXT[] DEFAULT '{}',
  meeting_schedule TEXT,
  membership_fee DECIMAL(10,2),
  description TEXT,
  requirements TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE outdoor_clubs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Outdoor clubs are viewable by everyone" ON outdoor_clubs
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO outdoor_clubs (
  name, type, location, contact_phone, contact_email, website,
  coordinator_name, age_groups, activities, accessibility_features,
  equipment_provided, meeting_schedule, membership_fee, description, requirements
) VALUES 
(
  'Nairobi Adaptive Sports Club',
  'sports',
  'Nairobi, Kasarani Sports Complex',
  '+254-700-999999',
  'info@nairobiadaptive.org',
  'www.nairobiadaptive.org',
  'Coach Michael Wanjiku',
  ARRAY['6-12 years', '13-18 years', '18+ years'],
  ARRAY['Wheelchair Basketball', 'Adaptive Swimming', 'Track and Field', 'Table Tennis'],
  ARRAY['Wheelchair Accessible', 'Adaptive Equipment', 'Sign Language Interpreter', 'Trained Staff'],
  ARRAY['Wheelchairs', 'Sports Equipment', 'Safety Gear', 'Adaptive Devices'],
  'Tuesdays and Thursdays 4-6 PM, Saturdays 9 AM-12 PM',
  2000.00,
  'Sports club specifically designed for individuals with physical disabilities. Professional coaching and competitive opportunities.',
  ARRAY['Medical clearance', 'Parental consent for minors', 'Basic fitness assessment']
),
(
  'Mombasa Beach Therapy Group',
  'therapy',
  'Mombasa, Diani Beach',
  '+254-700-101010',
  'info@mombasabeach.therapy',
  'www.mombasabeachtherapy.org',
  'Dr. Amina Hassan',
  ARRAY['5-15 years', 'Families welcome'],
  ARRAY['Beach Walks', 'Sand Play Therapy', 'Water Therapy', 'Sensory Activities'],
  ARRAY['Wheelchair Beach Access', 'Sensory-Friendly Environment', 'Quiet Spaces', 'Shade Areas'],
  ARRAY['Beach Wheelchairs', 'Sensory Toys', 'Shade Tents', 'First Aid Kit'],
  'Saturdays 8-11 AM, Sundays 3-6 PM',
  1500.00,
  'Therapeutic outdoor program using beach environment for sensory integration and motor skills development for children with autism and sensory processing disorders.',
  ARRAY['Therapist referral', 'Swimming ability assessment', 'Sun protection']
),
(
  'Kisumu Nature Explorers',
  'nature',
  'Kisumu, Lake Victoria Shores',
  '+254-700-111213',
  'info@kisumunature.org',
  'www.kisumunatureexplorers.org',
  'Ms. Grace Atieno',
  ARRAY['8-16 years', 'All abilities welcome'],
  ARRAY['Bird Watching', 'Nature Photography', 'Environmental Education', 'Gentle Hiking'],
  ARRAY['Wheelchair Accessible Trails', 'Visual Aids', 'Quiet Observation Areas', 'Flexible Pacing'],
  ARRAY['Binoculars', 'Field Guides', 'Cameras', 'Mobility Aids'],
  'First Saturday of each month 7 AM-2 PM',
  1000.00,
  'Nature exploration club welcoming children with various disabilities. Focus on environmental awareness and outdoor skills in accessible settings.',
  ARRAY['Comfortable outdoor clothing', 'Sun protection', 'Water bottle']
),
(
  'Eldoret Adventure Buddies',
  'adventure',
  'Eldoret, Kerio Valley',
  '+254-700-141516',
  'info@eldoretadventure.org',
  'www.eldoretadventurebuddies.org',
  'Mr. David Kiplagat',
  ARRAY['10-18 years', 'Peer mentors welcome'],
  ARRAY['Adaptive Rock Climbing', 'Camping', 'Team Building', 'Outdoor Cooking'],
  ARRAY['Adaptive Climbing Equipment', 'Accessible Campsites', 'Buddy System', 'Modified Activities'],
  ARRAY['Climbing Gear', 'Camping Equipment', 'Safety Equipment', 'Cooking Supplies'],
  'Monthly weekend camps, Weekly training sessions Wednesdays 4-6 PM',
  3000.00,
  'Adventure club providing outdoor challenges and team building for youth with and without disabilities. Emphasis on building confidence and friendships.',
  ARRAY['Physical assessment', 'Emergency contact', 'Adventure experience preferred but not required']
);
