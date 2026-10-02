@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF)
@REM Maven Wrapper startup batch script, version 3.2.0
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET "MAVEN_PROJECTBASEDIR=%~dp0") ELSE (SET "MAVEN_PROJECTBASEDIR=%__MVNW_ARG0_NAME__%")
@SET MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%
@SET /P MAVEN_DISTRIBUTIONURL=<"%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties" 2>NUL

@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip
@SET MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6-bin\apache-maven-3.9.6

@IF NOT EXIST "%MAVEN_HOME%\bin\mvn.cmd" (
  @ECHO Downloading Apache Maven 3.9.6...
  @powershell -NoProfile -Command "Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%TEMP%\maven.zip'; Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath '%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6-bin' -Force; Remove-Item '%TEMP%\maven.zip'"
)

@"%MAVEN_HOME%\bin\mvn.cmd" %*
