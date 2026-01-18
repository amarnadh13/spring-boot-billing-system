FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# rename the jar to app.jar
RUN cp target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
