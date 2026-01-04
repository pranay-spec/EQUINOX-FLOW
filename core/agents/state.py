from typing import TypedDict, Annotated, List, Dict, Any, Optional
import operator

class AgentState(TypedDict):
    # User Input
    current_city: str
    target_city: str
    user_profile: Dict[str, Any]  # income, expenses, lifestyle
    
    # Agent Outputs
    risk_analysis: Optional[Dict[str, Any]] # Actuary
    expense_analysis: Optional[Dict[str, Any]] # Fiscal Ghost
    compliance_analysis: Optional[Dict[str, Any]] # Nexus
    
    # Final Output
    final_report: Optional[Dict[str, Any]]
    wealth_projection: Optional[List[Dict[str, Any]]] # 5-year projection
    errors: List[str]
