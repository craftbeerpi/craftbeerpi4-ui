import subprocess
import click


@click.group()
def main():
    pass

@click.command()
@click.option('-m', prompt='Commit Message')
def release(m):
    subprocess.run(["npm", "run", "build"], cwd="./cbpi4-ui")
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", m])

main.add_command(release)

if __name__ == '__main__':
    main()