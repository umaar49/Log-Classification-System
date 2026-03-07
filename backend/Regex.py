import re
def regex_function(log_message):
    regex_pattern={
      r"User.User\d+.logged.(out|in).":"User Action",
      r"System updated to version.*":"System Notification",
      r"Backup completed successfully.":"System Notification",
      r"Backup (started|ended).at.*":"System Notification",
      r"File data_6169.csv uploaded successfully by user.*":"System Notification",
      r"System reboot initiated by user User.*":"System Notification",
      r"Disk cleanup completed successfully.":"System Notification",
      r"Account with ID.* created by User.*.":"User Action"
    }

    for pattern,label in regex_pattern.items():
        if re.search(pattern,log_message,re.IGNORECASE):
            return label
    return None
