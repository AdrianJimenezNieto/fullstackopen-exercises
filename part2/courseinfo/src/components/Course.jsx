
const Header = ({ text }) => <h2>{text}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ total }) => <h3>Total of {total} exercises</h3>

const Content = ({ content }) => {
  return (
    <div>
      {content.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}
const Course = (props) => {

  const {course} = props

  const total = course.parts.reduce((s, p) => s+p.exercises, 0)

  return (
    <div>
      <Header text={course.name} />
      <Content content={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course
