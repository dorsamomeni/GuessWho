import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Example test', () => {
  it('renders text', () => {
    const { getByText } = render(<Text>Hello Jest</Text>);
    expect(getByText('Hello Jest')).toBeTruthy();
  });
});
