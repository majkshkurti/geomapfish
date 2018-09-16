#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

setup(
    name='testgeomapfish_geoportal',
    version='1.0',
    description='testgeomapfish, a c2cgeoportal project',
    author='testgeomapfish',
    author_email='info@testgeomapfish.com',
    url='http://www.testgeomapfish.com/',
    install_requires=[
        'c2cgeoportal_geoportal',
        'c2cgeoportal_admin',
    ],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    entry_points={
        'paste.app_factory': [
            'main = testgeomapfish_geoportal:main',
        ],
        'console_scripts': [
        ],
    },
)
