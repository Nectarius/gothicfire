"""Pydantic request and response models shared between server.py and verify_agent.py."""

from typing import List, Optional
from pydantic import BaseModel, Field, AliasChoices


class DecisionRequest(BaseModel):
    game_id: str = Field(
        default="",
        validation_alias=AliasChoices("game_id", "gameId"),
        description="ID of the game session"
    )
    turn: int = Field(
        default=1,
        description="Current game turn number"
    )
    player_id: str = Field(
        default="",
        validation_alias=AliasChoices("player_id", "playerId"),
        description="ID of the computer player/character"
    )
    state_summary: str = Field(
        default="",
        validation_alias=AliasChoices("state_summary", "summary"),
        description="Summary of current game state and battlefield situation"
    )
    legal_moves: List[str] = Field(
        default_factory=list,
        validation_alias=AliasChoices("legal_moves", "legalMoves"),
        description="List of legal moves available to choose from"
    )

    model_config = {
        "populate_by_name": True
    }


class DecisionResponse(BaseModel):
    chosen_move: str = Field(description="Selected move from legal_moves")
    reasoning: str = Field(description="Short rationale for the choice")


class AdvisorRequest(BaseModel):
    game_id: str = Field(default="", validation_alias=AliasChoices("game_id", "gameId"))
    turn: int = Field(default=1)
    player_id: str = Field(default="", validation_alias=AliasChoices("player_id", "playerId"))
    advisor_id: str = Field(default="ZORAX", validation_alias=AliasChoices("advisor_id", "advisorId"))
    advisor_name: str = Field(default="Zorax the Mighty", validation_alias=AliasChoices("advisor_name", "advisorName"))
    question_type: str = Field(default="STATUS", validation_alias=AliasChoices("question_type", "questionType"))
    player_team: str = Field(default="RED", validation_alias=AliasChoices("player_team", "playerTeam"))
    player_summary: str = Field(default="", validation_alias=AliasChoices("player_summary", "playerSummary"))
    opponents_summary: str = Field(default="", validation_alias=AliasChoices("opponents_summary", "opponentsSummary"))
    map_summary: str = Field(default="", validation_alias=AliasChoices("map_summary", "mapSummary"))

    model_config = {
        "populate_by_name": True
    }


class AdvisorResponse(BaseModel):
    advisor_name: str
    advisorName: Optional[str] = None
    question_type: str
    questionType: Optional[str] = None
    advice: str
    key_points: List[str] = Field(default_factory=list)
    keyPoints: Optional[List[str]] = None
