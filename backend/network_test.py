import socket
import sys

def test_neon_connectivity():
    host = "ep-patient-cloud-a12cdfvm-pooler.ap-southeast-1.aws.neon.tech"
    port = 5432

    print(f"Testing network connectivity to {host}:{port}")

    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        result = sock.connect_ex((host, port))
        sock.close()

        if result == 0:
            print("Network connection successful!")
            return True
        else:
            print(f"Network connection failed (error code: {result})")
            return False
    except Exception as e:
        print(f"Network test failed: {e}")
        return False

if __name__ == "__main__":
    test_neon_connectivity()
