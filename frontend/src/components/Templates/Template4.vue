<template>
  <div class="flex flex-col items-center justify-center h-screen w-screen">
    <h1 class="text-base md:text-2xl">Associe as imagens com as palavras:</h1>
    <li
      class="list-none mb-4"
      v-for="(image, index) in data.questionImages"
      :key="index"
    >
      <div class="grid grid-cols-8 gap-2 h-24">
        <div class="display-none md:col-span-1"></div>
        <div class="col-span-1 flex justify-center mr-2 items-center">
          <h1>{{ index + 1 }}</h1>
        </div>
        <div class="col-span-2 flex items-center justify-center">
          <img :src="image['url']" class="imagem" />
        </div>
        <div class="col-span-2 flex items-center justify-center">
          <input
            class="max-w-[60px] md:max-w-[100px]"
            type="number"
            v-model="answer[index]"
          />
        </div>
        <div class="col-span-1 flex items-center justify-start">
          <h1>
            {{ data.description.split(", ")[correctAnswer[index] - 1] }}
          </h1>
        </div>
      </div>
    </li>
    <div class="w-full flex items-center justify-center">
      <button class="botao ml-10 md:ml-0" @click="checkAnswer()">
        Confirmar
      </button>
    </div>

    <answer-message
      v-if="answered"
      :rightAnswer="rightAnswer"
      :value="data.value"
    />
  </div>
</template>

<script>
import { useIndexStore } from "@/stores/index";
import { useScoreStore } from "@/stores/score";
import AnswerMessage from "@/components/AnswerMessage.vue";

export default {
  components: { AnswerMessage },
  name: "TheTemplate4",
  mounted() {
    this.generateAnswer();
  },
  data() {
    return {
      index: useIndexStore(),
      score: useScoreStore(),
      answer: [],
      correctAnswer: [],
      answered: false,
      rightAnswer: false,
    };
  },

  props: {
    data: {
      type: Object,
      default: () => ({
        description: "",
        images: [],
        words: [],
        value: 5,
      }),
    },
  },
  methods: {
    generateAnswer() {
      for (let i = 1; i < this.data.description.split(", ").length + 1; i++) {
        this.correctAnswer.push(i);
      }
      this.correctAnswer.sort(() => Math.random() - 0.5);
    },
    checkAnswer() {
      if (this.answer.toString() == this.correctAnswer.toString()) {
        this.score.update(this.data.value);
        this.score.incrementAnswerCounter();
        this.rightAnswer = true;
      }
      this.score.incrementQuestionCounter();
      this.answered = true;
    },
  },
};
</script>
<style scoped>
.imagem {
  height: 96px !important;
}
</style>
