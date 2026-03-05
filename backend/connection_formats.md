# Try these connection string formats in order:

# Format 1: Basic (remove extra params)
postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Format 2: With pooler (if available)
postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Format 3: Direct connection (no pooler)
postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm-primary.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Format 4: With connection timeout
postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30
