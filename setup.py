from setuptools import setup
import os
import re


with open(os.path.join(os.path.abspath(os.path.dirname(
        __file__)), 'cbpi4ui', 'version.py'), 'r', encoding='latin1') as fp:
    try:
        match = re.search('.*\"(.*)\"', fp.readline())
        version = match.group(1)
    except IndexError:
        raise RuntimeError('Unable to determine version.')


print(version)

setup(name='cbpi4ui',
      version=version,
      description='CraftBeerPi User Interface',
      author='Manuel Fritsch',
      author_email='manuel@craftbeerpi.com',
      url='http://web.craftbeerpi.com',
      include_package_data=True,
      package_data={
        # If any package contains *.txt or *.rst files, include them:
      '': ['*.txt', '*.rst', '*.yaml'],
      'cbpi4-ui-plugin': ['*','*.txt', '*.rst', '*.yaml']},
      packages=['cbpi4ui'],
     )
