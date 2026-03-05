# Test different Supabase hostname formats
formats_to_test = [
    "db.yhwwtxcbamhvroxiqdht.supabase.co",
    "db.yhwwtxcbamhvroxiqdht.supabase.co:5432", 
    "db.yhwwtxcbamhvroxiqdht.supabase.co/postgres",
    "db.yhwwtxcbamhvroxiqdht.supabase.co:5432/postgres"
]

print("Testing different hostname formats...")
for i, hostname in enumerate(formats_to_test, 1):
    print(f"{i}. {hostname}")
    
print("\nTry these formats in your connection string:")
print("1. postgres://[PASSWORD]@[HOSTNAME]:5432/postgres")  
print("2. postgres://[PASSWORD]@[HOSTNAME]/postgres")
