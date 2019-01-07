<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1  Home
        input(
          type="text"
          placeholder="What you will watch"
          v-model="taskTitle"
          @keyup.enter="newTask"
        )
        textarea(
          type="text"
          v-model="taskDescription"
          @keyup.enter="newTask"
        )
        .option-list
          input.what-watch--radio(
            type="radio"
            id="radioFilm"
            value="Film"
            v-model="whatWatch"
          )
          label(
            for="radioFilm"
          ) Film
          input.what-watch--radio(
            type="radio"
            id="radioShow"
            value="Show"
            v-model="whatWatch"
          )
          label(
            for="radioShow"
          ) Show
        .total-time
          .total-time__film(
            v-if="whatWatch === 'Film'"
          )
            span.time-title Hours
            input.time-input(
              type="number"
              v-model="filmHours"
            )
            span.time-title Minutes
            input.time-input(
              type="number"
              v-model="filmMinutes"
            )
            p {{ filmTime }}
          .total-time
          .total-time__show(
            v-if="whatWatch === 'Show'"
          )
            span.time-title How many season?
            input.time-input(
              type="number"
              v-model="showSeason"
            )
            span.time-title How many series?
            input.time-input(
              type="number"
              v-model="showSeries"
            )
            span.time-title How long is one series? (minutes)
            input.time-input(
              type="number"
              v-model="showSeriesMinutes"
            )
            p {{ showTime }}
        .tag-list
          .ui-tag__wrapper
            .ui-tag
              span.tag-title
              span.button-close
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskId: 4,
      taskDescription: '',
      whatWatch: 'film',
      filmHours: 1,
      filmMinutes: 30,
      showSeason: 1,
      showSeries: 11,
      showSeriesMinutes: 40
    }
  },
  methods: {
    newTask: function () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.showTime
      }
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        completed: false,
        editing: false
      }
      console.log(task)
      this.taskTitle = ''
      this.taskDescription = ''
      this.taskId++
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' hours ' + min + ' minutes'
    }
  },
  computed: {
    filmTime () {
      let min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMinutes(min)
    },
    showTime () {
      let min = this.showSeason * this.showSeries * this.showSeriesMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .option-list
    display flex
    .what-watch--radio
      margin-right 12px
    input
      margin-bottom 0
    label
      margin-right 20px
      margin-bottom 0
      &:last-child
        margin-right 0
  .total-time
    margin-bottom 20px
  .time-title
    display block
    margin-bottom 6px
  .time-input
    max-width 80px
    margin-right 10px
</style>
