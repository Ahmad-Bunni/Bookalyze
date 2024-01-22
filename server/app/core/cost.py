from typing import Any, Dict, List

import tiktoken
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.callbacks.openai_info import (
    MODEL_COST_PER_1K_TOKENS,
    get_openai_token_cost_for_model,
)
from langchain.schema import LLMResult


class Cost:
    def __init__(
        self, total_cost=0, total_tokens=0, prompt_tokens=0, completion_tokens=0
    ):
        self.total_cost = total_cost
        self.total_tokens = total_tokens
        self.prompt_tokens = prompt_tokens
        self.completion_tokens = completion_tokens

    def __str__(self):
        return (
            f"Tokens Used: {self.total_tokens}\n"
            f"\tPrompt Tokens: {self.prompt_tokens}\n"
            f"\tCompletion Tokens: {self.completion_tokens}\n"
            f"Total Cost (USD): ${self.total_cost}"
        )

    def add_prompt_tokens(self, prompt_tokens):
        self.prompt_tokens += prompt_tokens
        self.total_tokens += prompt_tokens

    def add_completion_tokens(self, completion_tokens):
        self.completion_tokens += completion_tokens
        self.total_tokens += completion_tokens


class CostCalcCallbackHandler(AsyncCallbackHandler):
    def __init__(self, model_name, cost, *args, **kwargs):
        self.model_name = model_name
        self.encoding = tiktoken.encoding_for_model(model_name)
        self.cost = cost
        super().__init__(*args, **kwargs)

    async def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> None:
        for prompt in prompts:
            self.cost.add_prompt_tokens(len(self.encoding.encode(prompt)))

    async def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        for generation_list in response.generations:
            for generation in generation_list:
                self.cost.add_completion_tokens(
                    len(self.encoding.encode(generation.text))
                )
        if self.model_name in MODEL_COST_PER_1K_TOKENS:
            prompt_cost = get_openai_token_cost_for_model(
                self.model_name, self.cost.prompt_tokens
            )
            completion_cost = get_openai_token_cost_for_model(
                self.model_name, self.cost.completion_tokens, is_completion=True
            )
            self.cost.total_cost = prompt_cost + completion_cost
