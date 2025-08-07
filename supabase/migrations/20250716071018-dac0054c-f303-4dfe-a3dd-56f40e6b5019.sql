-- Add morning and evening milk output columns to feed_records table
ALTER TABLE public.feed_records 
ADD COLUMN milk_output_morning DECIMAL,
ADD COLUMN milk_output_evening DECIMAL;

-- Update existing records to split milk_output into morning (assuming it was total, split it evenly)
UPDATE public.feed_records 
SET 
  milk_output_morning = CASE WHEN milk_output IS NOT NULL THEN milk_output / 2 ELSE NULL END,
  milk_output_evening = CASE WHEN milk_output IS NOT NULL THEN milk_output / 2 ELSE NULL END
WHERE milk_output IS NOT NULL;