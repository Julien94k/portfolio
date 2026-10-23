package com.julienlim.portfolio.admin;

import java.time.Clock;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julienlim.portfolio.contact.ContactMessageRepository;

@Service
public class AdminMessageService {

    private final ContactMessageRepository repository;
    private final Clock clock;

    public AdminMessageService(ContactMessageRepository repository, Clock clock) {
        this.repository = repository;
        this.clock = clock;
    }

    @Transactional(readOnly = true)
    public List<AdminMessageView> latest() {
        return repository.findTop500ByOrderByCreatedAtDesc().stream().map(AdminMessageView::from).toList();
    }

    @Transactional
    public AdminMessageView markRead(UUID id) {
        var message = repository.findById(id).orElseThrow(() -> new MessageNotFoundException(id));
        message.markRead(clock.instant());
        return AdminMessageView.from(message);
    }

    @Transactional
    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new MessageNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
