from typing import Dict, Any

class FiscalGhostAgent:
    def __init__(self):
        # Could initialize exchange rate APIs here
        pass

    def calculate_expenses(self, user_profile: Dict[str, Any], target_city: str) -> Dict[str, Any]:
        """
        Replays user spending habits in the target city.
        """
        print(f"Fiscal Ghost: Calculating expenses for {target_city}")
        
        current_expenses = user_profile.get("monthly_expenses", 3000)
        
        # Mock Cost of Living Multiplier
        # Real impl would fetch Zyla/Numbeo data
        col_multiplier = 1.2 if target_city.lower() in ["london", "new york", "singapore"] else 0.7
        
        projected_expenses = current_expenses * col_multiplier
        
        return {
            "original_expenses": current_expenses,
            "projected_expenses": projected_expenses,
            "col_multiplier": col_multiplier,
            "currency": "USD", # Normalized for now
            "details": {
                "rent": projected_expenses * 0.4,
                "food": projected_expenses * 0.2,
                "transport": projected_expenses * 0.1,
                "misc": projected_expenses * 0.3
            }
        }
