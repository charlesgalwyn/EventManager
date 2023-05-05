import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/* 
"- Your UI, code, and repository structure are well done. Add the backend code as well in the repo.
- It would be better to remove the Login/Signup button from the UI and replace it with the username of the logged-in user once they log in.
- The functionalities for sending and accepting requests are well-implemented, but when a request is accepted, users should be able to see the list of participants' names in the event, which is currently not implemented.
- Additionally, the navigation bar has too many options, and it would be good to minimize them by combining similar routes.
- The event cards could benefit from additional details, such as the number of available slots and the status of the match, whether it has started or ended.
- Overall, great job!" */