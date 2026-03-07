from Regex import regex_function
from LLM import LLM_function
from BERT import bert_function

lab = {
    0: "critical",
    1: "Error",
    2: "HTTP",
    3: "Resource Usage",
    4: "security Alert",
    5: "system notification"
}

def classify_log(logs):
    labels = []

    for source, log_msg in logs:
        if source == "LegacyCRM":
            message = LLM_function(log_msg)

        else:
            label = regex_function(log_msg)

            if label is not None:
                message = label  
            else:
                bert_label = bert_function(log_msg)
                message = lab.get(bert_label, "Unclassify")

        labels.append(message)

    return labels
