import * as React from "react";
import { useForm } from "react-hook-form";
import "./form.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    submissionId,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      "last-first-name": "",
      "number-phone": "",
      messenger: "",
      "available-time": ["morning"],
      "free-week": ["saturday", "sunday"],
    },
  });
  const onSubmit = (data) => alert(JSON.stringify(data));

  if (submissionId) {
    return <p>Thank you! Submission Id: {submissionId}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Розробка проекту</h1>

      <div>
        <label>
          <span>Як до Вас звертатись?</span>
          <input
            {...register("last-first-name", {
              required: "це поле обов'язкове!",
            })}
            aria-invalid={errors["last-first-name"] ? "true" : "false"}
            type="text"
          />
        </label>
        {errors["last-first-name"] && (
          <p role="alert">{errors["last-first-name"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Ваш номер телефону</span>
          <input {...register("number-phone")} type="tel" />
        </label>
      </div>

      <div>
        <label>
          <span>Вкажіть посилання на соціальні мережі для зв'язку</span>
          <input {...register("messenger")} type="text" />
        </label>
      </div>

      <label>
        <span>
          Який проміжок часу вам підходить для звернень або отримання
          повідомлень?
        </span>
        {[
          { label: "Ранок (9:00 - 12:00)", value: "morning" },
          { label: "День (12:00 - 18:00)", value: "midday" },
          { label: "Вечір (18:00 - 22:00)", value: "evening" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("available-time")}
                aria-invalid={errors["available-time"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["available-time"] && (
          <p role="alert">{errors["available-time"]?.message}</p>
        )}
      </label>

      <div>
        <span>В які дні тижня ви б хотіли займатись проектом?</span>
        {[
          { label: "Понеділок", value: "monday" },
          { label: "Вівторок", value: "tuesday" },
          { label: "Середа", value: "wednesday" },
          { label: "Четвер", value: "thursday" },
          { label: "П'ятниця", value: "friday" },
          { label: "Субота", value: "saturday" },
          { label: "Неділя", value: "sunday" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("free-week", {
                  required: true,
                })}
                aria-invalid={errors["free-week"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["free-week"] && (
          <p role="alert">{errors["free-week"]?.message}</p>
        )}
      </div>

      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}
