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
        .tag-list.tag-list--add
          .ui-tag__wrapper(
            @click="tagMenuShow = !tagMenuShow"
          )
            .ui-tag
              span.tag-title Add new
              span.button-close(
                :class="{ active: !tagMenuShow }"
              )
        .tag-list.tag-list--menu(
          v-if="tagMenuShow"
        )
          input.tag-add--input(
            type="text"
            placeholder="New tag"
            v-model="tagTitle"
            @keyup.enter="newTag"
          )
          .button.button-default(
            @click="newTag"
          ) Send
        .tag-list
          .ui-tag__wrapper(
            v-for="tag in tags"
            :key="tag.title"
          )
            .ui-tag(
              @click="addTagUsed(tag)"
              :class="{ active: tag.use }"
            )
              span.tag-title {{ tag.title }}
              span.button-close(
                :class="{ active: tag.use }"
              )
        p {{ tagsUsed }}
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
      showSeriesMinutes: 40,
      tagTitle: '',
      tagMenuShow: false,
      tagsUsed: [],
      tags: [
        {title: 'comedy', use: false},
        {title: 'western', use: false},
        {title: 'adventure', use: false}
      ]
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      this.tags.push({
        title: this.tagTitle,
        use: false
      })
    },
    newTask () {
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
        tagsUsed: this.tagsUsed,
        completed: false,
        editing: false
      }
      this.$store.dispatch('newTask', task)
      console.log(task)
      this.taskId++
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push(tag.title)
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
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
  .tag-list
    margin-bottom 20px
  .ui-tag__wrapper
    margin-right 18px
    margin-bottom 10px
    &:last-child
      margin 0
  .ui-tag
    &.active
      background-color #f5f5f5
    cursor pointer
    .button-close
      &.active
        transform rotate(45deg)
    &.used
      background-color #444ce0
      color #fff
      .button-close
        &:before,
        &:after
          background-color #fff
  .tag-list--menu
    display flex
    justify-content space-between
    align-items center
  .tag-add--input
    margin-bottom 0
    margin-right 10px
    height 42px
</style>
