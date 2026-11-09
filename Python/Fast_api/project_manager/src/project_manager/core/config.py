from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Project Manager API"
    MONGO_URI: str
    MONGO_DB_NAME: str = "taskflow_db"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()