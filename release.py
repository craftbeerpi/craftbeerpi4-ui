import subprocess
subprocess.run(["ls", "-l"])

subprocess.run(["git", "add", "-A"])
subprocess.run(["git", "commit", "-m", "test"])