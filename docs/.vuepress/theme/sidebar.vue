<script>
import { h } from 'vue'
// DONE: vue写递归组件 生成侧边栏
function hRender(h, x) {
  return h('li', [
    h('a', { href: '#' + x.text }, [x.text]),
    x.children instanceof Array
      ? x.children.map((t) => {
          return [hRender(h, t)]
        })
      : [],
  ])
}
export default {
  name: 'SideBar',
  props: {
    titles: Object,
  },
  render() {
    return h('ul', {}, [
      h('a', { href: '#' + this.titles.text }, [this.titles.text]),
      this.titles && this.titles.children instanceof Array
        ? this.titles.children.map((x) => {
            return [hRender(h, x)]
          })
        : [],
    ])
  },
}
</script>

<style lang="css" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul {
  padding-left: 20px;
}
li {
  padding-left: 10px;
}
ul a,
li a {
  color: var(--color);
  transition: color 0.2s cubic-bezier(0.14, 0.87, 0.9, 0.39);
}
ul a:hover,
li a:hover {
  color: var(--c-text-accent);
}
ul > a {
  font-weight: 600;
}
</style>
