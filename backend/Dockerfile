########Maven build stage########
FROM maven:3.5-jdk-11-slim as maven_build

# copy src
COPY src /app/src
# copy pom
COPY pom.xml /app

RUN mvn -f /app/pom.xml clean package

#WORKDIR /app
#RUN mvn install

#RUN tree app
##### Second stage build #####
FROM gcr.io/distroless/java
COPY --from=maven_build /app/target/*.jar /usr/app/backend.jar
# build the app and download dependencies only when these are new (thanks to the cache)

EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/backend.jar"]
