from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
from agents.graph import app as graph_app
from agents.state import AgentState

app = FastAPI(title="SovereignSim Core", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "SovereignSim Core is Online", "status": "active"}

class SimulationRequest(BaseModel):
    current_city: str
    target_city: str
    user_profile: Dict[str, Any]

@app.post("/simulate")
async def simulate_relocation(request: SimulationRequest):
    """
    Triggers the Agentic Trio to simulate relocation.
    """
    initial_state: AgentState = {
        "current_city": request.current_city,
        "target_city": request.target_city,
        "user_profile": request.user_profile,
        "risk_analysis": None,
        "expense_analysis": None,
        "compliance_analysis": None,
        "final_report": None,
        "wealth_projection": None,
        "errors": []
    }
    
    try:
        # invoke the graph
        result = graph_app.invoke(initial_state)
        return {
            "status": "success",
            "data": {
                "final_report": result.get("final_report"),
                "wealth_projection": result.get("wealth_projection"),
                "risk_analysis": result.get("risk_analysis"),
                "expense_analysis": result.get("expense_analysis"),
                "compliance_analysis": result.get("compliance_analysis")
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
