import subprocess
import json

def get_neon_projects():
    try:
        # Try to get project info
        result = subprocess.run(['npx', 'neonctl', 'projects', 'list', '--output', 'json'], 
                              capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            projects = json.loads(result.stdout)
            print("Projects found:")
            for project in projects:
                print(f"  - {project.get('name', 'Unknown')} (ID: {project.get('id', 'Unknown')})")
            return projects
        else:
            print(f"Error getting projects: {result.stderr}")
            return None
    except Exception as e:
        print(f"Exception: {e}")
        return None

if __name__ == "__main__":
    get_neon_projects()
