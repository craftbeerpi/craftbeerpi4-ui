import subprocess
import click
import re

@click.group()
def main():
    pass

@click.command()
@click.option('-m', prompt='Commit Message')
def release(m):

    file = "./version.py"
    with open(file) as reader:
        print()
        m = re.search('.*\"(.*)\"', reader.readline())
        
        major, minor, patch  = m.group(1).split(".")
        patch = int(patch)
        patch += 1
        new_version = "__version__ = \"{}.{}.{}\"".format(major,minor,patch)
        #__version__ = "4.0.6"
        with open(file,'w',encoding = 'utf-8') as file:
            file.write(new_version)

    #subprocess.run(["npm", "run", "build"], cwd="./cbpi4-ui")
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", "\"{}\"".format(m)])
    subprocess.run(["git", "push"])

    
main.add_command(release)
if __name__ == '__main__':
    main()
