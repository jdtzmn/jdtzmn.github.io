<template lang="pug">
  div
    titlebar
    .content
      .aboutme
        .row.no-flex {{ phrase }}
      segment
        .segment-header About
        .segment-content.h2.text-light {{ about }}
      segment.slanted.blue.light-text
        .segment-header Projects
        .segment-content
          .row.project-cards
            card(
              type='raised',
              v-for='project in projects',
              :key='project.name'
            )
              .card-header.project-header
                div {{ project.name }}
                a.project-link(:href='project.link')
                  font-awesome-icon(:icon="['fab', 'github']")
              img.card-image(:src='project.img', width='100%')
              .card-body {{ project.description }}
        a.see-more(href='https://github.com/jdtzmn?tab=repositories') Show me more
      segment
        .segment-header More Info
        .segment-content
          .row.cards
            card
              .card-header Experience
              .card-body.experiences
                .experience(
                  v-for='experience in experiences',
                  :key='experience.name'
                )
                  div {{ experience.name }}
                  div {{ experience.time }}
            card
              .card-header Skills
              .card-body.skills
                a.skill-tag(
                  v-for='skill in skills',
                  :key='skill.name',
                  :href='skill.link'
                )
                  font-awesome-icon(
                    v-if='skill.icon',
                    :icon="['fab', skill.icon]"
                  )
                  div {{ skill.name }}
            card
              .card-header Languages
              .card-body
                .language(
                  v-for='language in languages',
                  :key='language.name'
                )
                  div {{ language.name }}
                  div {{ language.time }}
    footer-links
</template>

<script lang="ts">
import TitleBar from '@/components/TitleBar/TitleBar.vue'
import Card from '@/components/Card/Card.vue'
import Segment from '@/components/Segment/Segment.vue'
import Footer from '@/components/Footer/Footer.vue'

import Vue from 'vue'

// font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVuejs, faApple, faCodepen, faCss3, faDocker, faFontAwesome,
  faGithubSquare, faHtml5, faJava, faReact, faJsSquare, faLinux,
  faNode, faNpm, faOsi, faPython, faSass, faGithub
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faVuejs, faApple, faCodepen, faCss3, faDocker, faFontAwesome,
  faGithubSquare, faHtml5, faJava, faReact, faJsSquare, faLinux,
  faNode, faNpm, faOsi, faPython, faSass, faGithub)

export default Vue.extend({
  components: { TitleBar,
    Segment,
    Card,
    Footer,
    'font-awesome-icon': FontAwesomeIcon
  },
  data () {
    return {
      phrase: 'A high school student with a passion for programming',
      about: `Jacob is an experienced full-stack web app developer. He
      started web development in second grade when he was nine years old.
      In fifth grade, he stayed up for three days straight and started
      learning JavaScript entirely off of StackOverflow questions. Without 
      any prior programming experience, he had completed his first website
      within a week. Since then, Jacob has worked on numerous personal and
      professional projects. Even before his first AP computer science course,
      Jacob had already built twelve web apps. He has competed on two 
      competitive robotics teams, and is currently taking a second computer 
      science class in functional programming and chip design. He is
      constantly working on one app or another, and is always learning 
      about new technologies to improve his apps. Jacob is a very 
      enthusiastic and focused individual who thrives working independently 
      or on a team.`,
      projects: [
        {
          name: 'ChRIS Store UI',
          img: '/projects/ChRIS_store_ui.png',
          link: 'https://github.com/FNNDSC/ChRIS_store_ui',
          description: `ChRIS is an open source framework that utilizes 
            cloud technologies to democratize medical analytics 
            application development. The ChRIS Store is a store for all
            the ChRIS plugins and a place for developers to publish their own.`
        },
        {
          name: 'SpotSync',
          img: '/projects/SpotSync.png',
          link: 'https://github.com/jdtzmn/spotsync/tree/v3.0.0',
          description: `SpotSync is a web app powered by the Spotify Web Playback SDK
            that automatically syncs two Spotify accounts to play music at the same
            time. When the "leader" changes songs, all the listeners' songs change 
            magically to the next song.`
        },
        {
          name: 'Twitch Dashboard',
          img: '/projects/TwitchDashboard.png',
          link: 'https://github.com/jdtzmn/Twitch-Dashboard/tree/electron',
          description: `Twitch Dashboard is an electron app that gives a preview of what
            the viewers see in a window that can be viewed while playing games. It also
            sends Twitch chat as desktop notifications to the top right corner of the screen.`
        }
      ],
      experiences: [
        { name: 'Arcus – Web App', time: '2015 – 2018' },
        { name: 'SpotSync', time: '2016-2017' },
        { name: 'Twitch Dashbaord', time: '2017' },
        { name: 'Gators – Free Texting Framework', time: '2017' },
        { name: 'Red Hat Internship', time: 'Summer 2018' }
      ],
      skills: [
        {
          name: 'Vue',
          icon: 'vuejs',
          link: 'https://vuejs.org'
        },
        {
          name: 'Swift',
          icon: 'apple',
          link: 'https://swift.org'
        },
        {
          name: 'Codepen',
          icon: 'codepen',
          link: 'https://codepen.io'
        },
        {
          name: 'CSS3',
          icon: 'css3',
          link: 'https://css3.com'
        },
        {
          name: 'Sketch',
          link: 'https://sketchapp.com'
        },
        {
          name: 'Docker',
          icon: 'docker',
          link: 'https://docker.com'
        },
        {
          name: 'Redis',
          link: 'https://redis.io'
        },
        {
          name: 'Font Awesome',
          icon: 'font-awesome',
          link: 'https://fontawesome.com'
        },
        {
          name: 'Github',
          icon: 'github-square',
          link: 'https://github.com'
        },
        {
          name: 'HTML5',
          icon: 'html5',
          link: 'https://html5.com'
        },
        {
          name: 'Java',
          icon: 'java',
          link: 'https://java.oracle.com'
        },
        {
          name: 'Passport',
          link: 'http://www.passportjs.org'
        },
        {
          name: 'Express',
          link: 'https://expressjs.com'
        },
        {
          name: 'Socket.IO',
          link: 'https://socket.io'
        },
        {
          name: 'React',
          icon: 'react',
          link: 'https://reactjs.org'
        },
        {
          name: 'JavaScript',
          icon: 'js-square',
          link: 'https://javascript.com'
        },
        {
          name: 'Linux',
          icon: 'linux',
          link: 'https://linux.org'
        },
        {
          name: 'Heroku',
          link: 'https://heroku.com'
        },
        {
          name: 'NodeJS',
          icon: 'node',
          link: 'https://nodejs.org'
        },
        {
          name: 'npm',
          icon: 'npm',
          link: 'https://npmjs.com'
        },
        {
          name: 'Open Source',
          icon: 'osi',
          link: 'https://opensource.org'
        },
        {
          name: 'Python',
          icon: 'python',
          link: 'https://python.org'
        },
        {
          name: 'SCSS',
          icon: 'sass',
          link: 'https://sass-lang.com'
        }
      ],
      languages: [
        { name: 'HTML & CSS', time: '2009' },
        { name: 'JavaScript', time: '2011' },
        { name: 'Java', time: '2017' },
        { name: 'Swift', time: '2018' },
        { name: 'Python', time: '2018' },
        { name: 'Objective-C', time: '2018' },
        { name: 'Racket', time: '2018' }
      ]
    }
  }
})
</script>

<style lang="scss">
@import '~@/styles/global';
</style>

<style scoped lang="scss">
@import '~@/styles/colors';
@import '~@/styles/grid';
@import '~@/styles/font';

.content {
  // display
  padding-bottom: 30px;
}

.aboutme {
  // color
  background: $lightgray;
  color: $blacktext;

  // display
  padding: 1em 0;

  // font
  font-size: 2em;
  font-weight: 300;
  text-align: center;
}

.project-cards {
  // display
  padding: 0;
  gap: 25px !important;

  @include md {
    row-gap: 0 !important;
  }
}

.language, .experience, .project-header {
  // display
  padding: 8px 0;

  // grid
  @include row(2, false);
  grid-template-columns: 1fr max-content;
}

.project-link {
  // color
  color: $blacktext;

  // transition
  transition: color 0.2s;

  &:hover {
    // color
    color: $gray;
  }
}

.see-more {
  // color
  color: lighten($blue, 60%);
  background: darken($blue, 15%);

  // display
  display: block;
  width: 150px; // if max-content isn't supported
  width: max-content;
  margin: 40px auto 0;
  padding: 10px 75px;

  // font
  text-decoration: none;

  // border and shadow
  border: 1px solid lighten($blue, 20%);
  border-radius: 4px;

   // transition
   transition: all 0.3s;

   &:hover {
     // shadow
     box-shadow: 0px 0px 4px lighten($blue, 20%);

     // other
     transform: scale(1.02);
   }
}

.cards {
  // display
  padding: 0;
}

.skill-tag {
  // color
  color: $darkgray;

  // display
  display: inline-flex;
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  vertical-align: top;

  // border
  border: 1px solid $gray;
  border-radius: 4px;

  // font
  text-decoration: none;

  // transition
  transition: transform 0.2s, border-color 0.2s;

  // other
  cursor: pointer;

  &:hover {
    // border
    border-color: $blacktext;

    // other
    transform: scale(1.05);
  }

  & > svg {
    // display
    padding-top: 6px;
  }

  & > div {
    // display
    height: max-content;
    padding-left: 5px;
  }
}

.blue {
  // color
  background: $blue;
  background: linear-gradient(160deg, $blue, darken($blue, 7.5%))
}
</style>
