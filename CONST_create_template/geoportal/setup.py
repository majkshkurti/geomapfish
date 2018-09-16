#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

setup(
    name='TestGeoMapFishPackage_geoportal',
    version='1.0',
    description='TestGeoMapFishPackage, a c2cgeoportal project',
    author='TestGeoMapFishPackage',
    author_email='info@TestGeoMapFishPackage.com',
    url='http://www.TestGeoMapFishPackage.com/',
    install_requires=[
        'c2cgeoportal_geoportal',
        'c2cgeoportal_admin',
    ],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    entry_points={
        'paste.app_factory': [
            'main = TestGeoMapFishPackage_geoportal:main',
        ],
        'console_scripts': [
        ],
    },
)
