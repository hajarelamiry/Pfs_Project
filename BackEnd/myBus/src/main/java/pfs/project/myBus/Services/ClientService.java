// src/main/java/pfs/project/myBus/Service/ClientService.java

package pfs.project.myBus.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfs.project.myBus.Dto.ClientDto;
import pfs.project.myBus.Entity.Client;
import pfs.project.myBus.Repository.ClientRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepo clientRepo;

    public List<ClientDto> getAllClients() {
        return clientRepo.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ClientDto getClientById(Long id) {
        Client client = clientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        return convertToDto(client);
    }


    public ClientDto createClient(ClientDto dto) {
        Client client = new Client();
        client.setFirstName(dto.getFirstName());
        client.setLastName(dto.getLastName());
        client.setEmail(dto.getEmail());
        Client saved = clientRepo.save(client);
        return convertToDto(saved);
    }


    public void deleteClient(Long id) {
        if (!clientRepo.existsById(id)) {
            throw new RuntimeException("Client introuvable pour suppression");
        }
        clientRepo.deleteById(id);
    }


    private ClientDto convertToDto(Client client) {
        ClientDto dto = new ClientDto();
        dto.setId(client.getId());
        dto.setFirstName(client.getFirstName());
        dto.setLastName(client.getLastName());
        dto.setEmail(client.getEmail());
        return dto;
    }
}
