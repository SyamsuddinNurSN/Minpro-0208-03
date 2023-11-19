import {
    Box,
    Stack,
    Button,
    Heading,
    Center,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useNavigate, useParams } from 'react-router-dom';

  function Verify() {
    const params = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const handleSubmit = async () => {
      try {
       const response = await axios.patch(
          `http://localhost:2000/users/verify-Cashier/${id}`, {},
          { usersId: params.id },
          {
            headers: {
              Authorization: `Bearer ${params.token}`,
            },
          }
        );
        toast({
          title: 'Success',
          description: 'User has been verified',
          status: 'success',
          duration: 4000,
          position: 'center',
        });

        const verificationLink = response.data.link;

        Window.location.href = verificationLink;
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Center>
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          p={8}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
        >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color={useColorModeValue('teal.500', 'teal.300')}>
              Account Verification
            </Heading>
          </Stack>
          <Box>
            <Button colorScheme='teal' size={'lg'} onClick={handleSubmit}>
              Verify Account
            </Button>
          </Box>
        </Stack>
      </Center>
    );
  }

  export default Verify;