from typing import Dict, Any
from langgraph.graph import StateGraph, END
from .state import AgentState
from .actuary.actuary import ActuaryAgent
from .fiscal_ghost.ghost import FiscalGhostAgent
from .nexus.nexus import NexusAgent

# Initialize Agents
actuary = ActuaryAgent()
ghost = FiscalGhostAgent()
nexus = NexusAgent()

def run_actuary(state: AgentState):
    target = state["target_city"]
    result = actuary.analyze_risk(target)
    return {"risk_analysis": result}

def run_ghost(state: AgentState):
    target = state["target_city"]
    user = state["user_profile"]
    result = ghost.calculate_expenses(user, target)
    return {"expense_analysis": result}

def run_nexus(state: AgentState):
    target = state["target_city"]
    user = state["user_profile"]
    result = nexus.analyze_compliance(user, target)
    return {"compliance_analysis": result}

def aggregator(state: AgentState):
    """
    Combines all insights into value projections.
    """
    print("Aggregating results...")
    
    # Calculate Savings/Wealth logic
    income = state["user_profile"].get("annual_income", 0)
    tax_info = state["compliance_analysis"]
    expense_info = state["expense_analysis"]
    
    net_income = income - tax_info["estimated_tax"]
    annual_expenses = expense_info["projected_expenses"] * 12
    
    savings = net_income - annual_expenses
    
    # 5-Year Projection (Simple Linear)
    projection = []
    current_wealth = state["user_profile"].get("current_wealth", 0)
    
    for year in range(1, 6):
        current_wealth += savings * 1.05 # 5% investment return assumption
        projection.append({
            "year": year,
            "wealth": current_wealth,
            "city": state["target_city"]
        })
        
    return {
        "final_report": {
            "net_annual_savings": savings,
            "quality_of_life_score": state["risk_analysis"]["overall_risk_rating"]
        },
        "wealth_projection": projection
    }

# Define Graph
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("actuary", run_actuary)
workflow.add_node("fiscal_ghost", run_ghost)
workflow.add_node("nexus", run_nexus)
workflow.add_node("aggregator", aggregator)

# Define Edges
# Parallel execution of agents
workflow.set_entry_point("actuary")
workflow.add_edge("actuary", "fiscal_ghost")
workflow.add_edge("fiscal_ghost", "nexus")
workflow.add_edge("nexus", "aggregator")
workflow.add_edge("aggregator", END)

# Compile
app = workflow.compile()
