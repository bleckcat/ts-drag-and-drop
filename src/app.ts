function autobind(
  _target: any,
  _method: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
  return adjustedDescriptor
}
class ProjectInput {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement
    this.hostElement = document.getElementById("app")! as HTMLDivElement

    const importNode = document.importNode(
      this.templateElement.content,
      true
    ) as DocumentFragment
    this.element = importNode.firstElementChild as HTMLFormElement
    this.element.id = "user-input"

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement

    this.configure()
    this.attach()
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    console.log(this.titleInputElement.value)
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element)
  }
}

const prjctInput = new ProjectInput()
