<?php

namespace App\Core\Infrastructure\Bus;

use App\Core\Infrastructure\Interaction\SharedEvent\SharedEventInterface;
use Symfony\Component\Messenger\MessageBusInterface;

readonly class SharedEventBus implements SharedEventBusInterface
{
    public function __construct(
        private MessageBusInterface $sharedEventBus,
    ) {
    }

    public function dispatch(SharedEventInterface $event, ?StampCollection $stamps = null): void
    {
        $this->sharedEventBus->dispatch($event, is_null($stamps) ? [] : $stamps->toArray());
    }
}
