import subprocess
import click
import re

@click.group()
def main():
    pass

@click.command()
@click.option('-m', prompt='Commit Message')
def commit(m):

    file = "./cbpi4ui/version.py"
    with open(file) as reader:
        match = re.search('.*\"(.*)\"', reader.readline())
        major, minor, patch  = match.group(1).split(".")
        patch = int(patch)
        patch += 1
        new_version = "__version__ = \"{}.{}.{}\"".format(major,minor,patch)
        with open(file,'w',encoding = 'utf-8') as file:
            file.write(new_version)

    subprocess.run(["npm", "run", "build"], cwd="./cbpi4ui")
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", "\"{}\"".format(m)])
    subprocess.run(["git", "push"])


@click.command()
def build():
    subprocess.run(["npm", "run", "build"], cwd="./cbpi4ui")
    subprocess.run(["python3", "setup.py", "sdist"])
    


@click.command()
def release():
    subprocess.run(["python3", "setup.py", "sdist"])
    file = "./cbpi4ui/version.py"
    with open(file) as reader:
        match = re.search('.*\"(.*)\"', reader.readline())
        version = match.group(1)
        path = "dist/cbpi4ui-{}.tar.gz".format(version)
        subprocess.run(["twine", "upload", path])
          

main.add_command(commit)
main.add_command(release)
main.add_command(build)

if __name__ == '__main__':
    main()
