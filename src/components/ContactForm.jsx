import { Form } from "react-router-dom";

function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <fieldset className="border text-white p-3 m-3 rounded">
      <legend className="md:text-[25px] px-4 font-semibold">Contact Us</legend>
      <Form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-2 mb-8">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              required
              className="w-[160px] md:w-[180px] rounded text-[#151515] font-medium outline-none px-2 py-2"
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              required
              className="w-[160px] md:w-[180px] rounded text-[#151515] font-medium outline-none px-2 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="number"
            name="phone"
            required
            className="w-[350px] md:w-[380px] rounded text-[#151515] font-medium outline-none px-2 py-2"
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-[350px] md:w-[380px] rounded text-[#151515] font-medium outline-none px-2 py-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            required
            name="message"
            className="w-[350px] md:w-[380px] h-[100px] rounded text-[#151515] font-medium outline-none px-2 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-white px-4 py-2 rounded text-[#151515] font-medium transition-all hover:bg-black hover:text-white ">
            Send message
          </button>
        </div>
      </Form>
    </fieldset>
  );
}

export default ContactForm;
