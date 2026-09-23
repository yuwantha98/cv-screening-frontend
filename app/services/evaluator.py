SKILL_WEIGHT = 0.70
EXPERIENCE_WEIGHT = 0.30

def clean_skill_results(required_skills, ai_matched_skills):
    required_skills = [
        str(skill).strip()
        for skill in (required_skills or [])
        if str(skill).strip()
    ]

    ai_matched_lower = {
        str(skill).lower().strip()
        for skill in (ai_matched_skills or [])
        if str(skill).strip()
    }

    matched_skills = [
        skill
        for skill in required_skills
        if skill.lower() in ai_matched_lower
    ]

    missing_skills = [
        skill
        for skill in required_skills
        if skill not in matched_skills
    ]

    return matched_skills, missing_skills

def calculate_match_percentage(required_skills, matched_skills, experience_score):
    required_skills = required_skills or []
    matched_skills = matched_skills or []

    try:
        experience_score = float(experience_score)
    except (TypeError, ValueError):
        experience_score = 0

    experience_score = max(0, min(100, experience_score))

    if required_skills:
        skill_score = (len(matched_skills) / len(required_skills)) * 100
    else:
        skill_score = 100

    final_score = (
        skill_score * SKILL_WEIGHT
        + experience_score * EXPERIENCE_WEIGHT
    )

    return {
        "skill_score": round(skill_score, 1),
        "experience_score": round(experience_score, 1),
        "match_percentage": round(final_score),
    }

def decision_maker(match_percentage, minimum_match_score=70):
    try:
        match_percentage = float(match_percentage)
    except (TypeError, ValueError):
        match_percentage = 0

    try:
        minimum_match_score = float(minimum_match_score)
    except (TypeError, ValueError):
        minimum_match_score = 70

    minimum_match_score = max(0, min(100, minimum_match_score))
    high_threshold = min(100, max(80, minimum_match_score + 10))

    if match_percentage >= high_threshold:
        return "Highly Recommended"

    if match_percentage >= minimum_match_score:
        return "Recommended"

    return "Not Recommended"
