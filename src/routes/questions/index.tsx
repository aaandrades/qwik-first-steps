import { $, component$, useStore, useStyles$ } from "@builder.io/qwik";
import styles from "./questions.css?inline";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { LabIcon } from "~/components/icons/Lab";
import { DropdownContent } from "../../components/dropdown-content/DropdownContent";
import { TextField } from "~/components/textfield/TextField";
import type { IStore } from "~/interface/general.interfaces";

export default component$(() => {
  const store = useStore<IStore>({
    role: "",
    experience: "",
    words: 300,
    randomness: 0.6,
    model: "xlarge",
  });
  useStyles$(styles);

  const getQuestion = $(async () => {
    const response = await fetch("/api", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.body);
    console.log(store);
  });

  return (
    <section class="questions-container">
      <header class="questions-container__header">
        <Link href="/" class="questions-container__header--title">
          <h1>AI Interview Ace 🤍</h1>
        </Link>
        <LabIcon style="questions-container__header--icon" />
      </header>
      <div class="questions-container__body">
        <p>
          Place holder for the question. Lorem ipsum dolor sit amet consectetur
        </p>
        <div class="questions-container__body--row">
          <TextField
            style="questions-container__body--textfield"
            label="Role"
            placeholder="Ej: Software Engineer"
            value={store.role}
            onChange={$((value: string) => (store.role = value))}
          />
          <TextField
            style="questions-container__body--textfield"
            label="Experience"
            placeholder="Ej: Senior"
            value={store.experience}
            onChange={$((value: string) => (store.experience = value))}
          />
        </div>
        <DropdownContent store={store} />
        <div class="questions-container__button">
          <button
            type="button"
            onClick$={() => getQuestion()}
            class="general-button"
          >
            Get questions
          </button>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Get your next question",
  meta: [
    {
      name: "description",
      content:
        "AI interview partner helps you to prepare for your next interview",
    },
  ],
};
