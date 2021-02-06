from setuptools import setup
from version import __version__

setup(name='cbpi4-ui',
      version=__version__,
      description='CraftBeerPi User Interface',
      author='Manuel Fritsch',
      author_email='manuel@craftbeerpi.com',
      url='http://web.craftbeerpi.com',
      include_package_data=True,
      package_data={
        # If any package contains *.txt or *.rst files, include them:
      '': ['*.txt', '*.rst', '*.yaml'],
      'cbpi4-ui-plugin': ['*','*.txt', '*.rst', '*.yaml']},
      packages=['cbpi4-ui'],
     )
