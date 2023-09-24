class HistoryExtractor:
    @staticmethod
    def process_messages(messages):
        question = messages.pop()['content']
        chat_history = [(messages[i]['content'], messages[i+1]['content'])
                        for i in range(0, len(messages) - 1, 2)]
        return chat_history, question
