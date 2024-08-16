<?php

namespace App\Core\Infrastructure\Bus;

use App\Core\Infrastructure\Interaction\Event\EventInterface;
use Symfony\Component\Messenger\MessageBusInterface;

readonly class EventBus implements EventBusInterface
{
    public function __construct(
        private MessageBusInterface $eventBus,
    ) {
    }

    public function dispatch(EventInterface $event, ?StampCollection $stamps = null): void
    {
        $this->eventBus->dispatch($event, is_null($stamps) ? [] : $stamps->toArray());
    }
}
