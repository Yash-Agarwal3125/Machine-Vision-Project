def get_confidence_level(confidence: float) -> str:
    """
    Returns a textual interpretation of the confidence score.
    Args:
        confidence: Float between 0.0 and 1.0 (or 0-100)
    Returns:
        str: "High confidence", "Medium confidence", or "Low confidence"
    """
    # Assuming confidence is 0.0-1.0, convert to percentage if needed
    # If the model returns 0-1, we check like this:
    if confidence > 1.0:
        # User might provide percentage 0-100
        conf_percent = confidence
    else:
        conf_percent = confidence * 100
        
    if conf_percent >= 90:
        return "High confidence"
    elif conf_percent >= 70:
        return "Medium confidence"
    else:
        return "Low confidence"
